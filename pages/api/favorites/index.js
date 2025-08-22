import db from '../../../utils/db';
import Favorite from '../../../models/Favorite';

export default async function handler(req, res) {
  const { method } = req;
  const { deviceId } = method === 'GET' ? req.query : req.body;

  if (!deviceId) {
    return res.status(400).json({ message: 'deviceId is required' });
  }

  try {
    await db.connectDb();

    if (method === 'GET') {
      const favorite = await Favorite.findOne({ deviceId }).lean();
      return res.status(200).json({ 
        fonts: favorite ? favorite.fonts : [], 
        brideGroomName: favorite ? favorite.brideGroomName : '' 
      });
    }

    if (method === 'POST') {
      const { font, brideGroomName } = req.body;
      let favorite = await Favorite.findOne({ deviceId });

      if (!favorite) {
        favorite = new Favorite({ deviceId, fonts: font ? [font] : [], brideGroomName: brideGroomName || '' });
      } else {
        if (font && !favorite.fonts.includes(font)) {
          favorite.fonts.push(font);
        }
        if (brideGroomName !== undefined) {
          favorite.brideGroomName = brideGroomName;
        }
      }
      await favorite.save();
      return res.status(200).json({ 
        fonts: favorite.fonts, 
        brideGroomName: favorite.brideGroomName 
      });
    }

    if (method === 'DELETE') {
      const { font } = req.body;
      if (!font) {
        return res.status(400).json({ message: 'font is required' });
      }

      const favorite = await Favorite.findOne({ deviceId });
      if (favorite) {
        favorite.fonts = favorite.fonts.filter((f) => f !== font);
        await favorite.save();
        return res.status(200).json({ 
          fonts: favorite.fonts, 
          brideGroomName: favorite.brideGroomName 
        });
      }
      return res.status(200).json({ fonts: [], brideGroomName: '' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error processing favorites:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}