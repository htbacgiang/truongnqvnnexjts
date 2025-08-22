import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites, removeFavoriteFont, updateBrideGroomName } from '../../store/favoritesSlice';
import { toast } from 'react-toastify';
import { getDeviceId } from '../../lib/deviceId';
import { fonts } from '../../lib/fonts';
import debounce from 'lodash/debounce';
import { ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import FontListPreview from '../../components/common/FontListPreview';

// Function to remove Vietnamese diacritics
function removeDiacritics(str) {
  return str
    .normalize('NFD') // Decompose diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
    .replace(/đ/g, 'd') // Replace 'đ' with 'd'
    .replace(/Đ/g, 'D'); // Replace 'Đ' with 'D'
}

export default function Favorites() {
    const dispatch = useDispatch();
    const favoriteFonts = useSelector((state) => state.favorites?.favoriteFonts ?? []);
    const favoritesStatus = useSelector((state) => state.favorites?.status ?? 'idle');
    const brideGroomName = useSelector((state) => state.favorites?.brideGroomName ?? '');

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const deviceId = getDeviceId();
    // Ref for hidden preview block
    const previewRef = useRef();

    // Fetch favorites & brideGroomName on mount
    useEffect(() => {
        dispatch(fetchFavorites(deviceId))
            .unwrap()
            .catch((error) => {
                toast.error(`Không thể tải danh sách yêu thích: ${error.message || 'Lỗi không xác định'}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
        // eslint-disable-next-line
    }, [dispatch, deviceId]);

    // Auto-fill input from redux (after fetch)
    useEffect(() => {
        setText(brideGroomName || '');
    }, [brideGroomName]);

    // Debounce update name to db on input
    const debouncedUpdateBrideGroomName = useRef(
        debounce((value) => {
            dispatch(updateBrideGroomName({ deviceId, brideGroomName: value }));
        }, 600)
    ).current;

    const handleInputChange = (e) => {
        setText(e.target.value);
        debouncedUpdateBrideGroomName(e.target.value);
    };

    const handleRemoveFavorite = async (font) => {
        try {
            await dispatch(removeFavoriteFont({ deviceId, font })).unwrap();
            toast.info(`Đã xóa ${font} khỏi danh sách yêu thích`);
        } catch (error) {
            toast.error(`Không thể xóa font: ${error.message || 'Lỗi không xác định'}`);
        }
    };

    const handleExportImage = async () => {
        if (!previewRef.current) return;

        // Use text from input, fallback to brideGroomName from Redux
        const name = text || brideGroomName || 'unnamed';
        // Remove diacritics and sanitize for valid filename
        const sanitizedName = removeDiacritics(name)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

        try {
            const canvas = await html2canvas(previewRef.current, { backgroundColor: null, scale: 2 });
            const link = document.createElement('a');
            link.download = `font-preview-${sanitizedName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error exporting image:', error);
            toast.error('Không thể tạo ảnh danh sách font');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <Head>
                <title>Font Wedding Yêu Thích</title>
                <meta
                    name="description"
                    content="Xem và quản lý danh sách font chữ yêu thích của bạn để sử dụng trong thiết kế thiệp cưới."
                />
                <meta name="keywords" content="font yêu thích, font chữ đám cưới, font Việt hóa" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/fonts.css" />
            </Head>

            <div className="max-w-full mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 uppercase">Font Yêu Thích</h1>
                <Link
                    href="/font-chu"
                    className="flex items-center text-blue-500 hover:text-blue-700 mb-4 w-fit gap-2 uppercase font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại chọn font chữ
                </Link>

                <div className="grid grid-cols-1 gap-2 md:gap-4 items-end mb-4">
                    <input
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                        placeholder="Nhập tên cô dâu chú rể..."
                        className="p-3 md:p-4 border rounded-lg shadow-sm text-lg"
                        aria-label="Nhập tên cô dâu chú rể"
                    />
                </div>
                <button
                    className="p-2 bg-pink-400 text-white rounded-lg mb-6"
                    onClick={handleExportImage}
                    aria-label="Tạo hình ảnh danh sách font yêu thích"
                >
                    Tạo hình ảnh danh sách font
                </button>

                {/* Hidden preview for html2canvas render */}
                <div style={{ position: 'absolute', left: -9999, top: 0 }}>
                    <div ref={previewRef}>
                        <FontListPreview
                            fonts={favoriteFonts}
                            brideGroomName={text || brideGroomName}
                            dark
                        />
                    </div>
                </div>
                {isLoading || favoritesStatus === 'loading' ? (
                    <div className="text-center">
                        <span className="inline-block animate-spin h-6 w-6 border-4 border-t-transparent border-gray-500 rounded-full" />
                        <span className="ml-2">Đang tải danh sách yêu thích...</span>
                    </div>
                ) : favoriteFonts.length === 0 ? (
                    <div className="text-center text-gray-500">Chưa có font nào trong danh sách yêu thích.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                        {favoriteFonts.map((font, index) => (
                            <div key={index} className="p-2 bg-white rounded-lg shadow">
                                <p
                                    style={{
                                        fontFamily: fonts.includes(font) ? `${font}, Arial, sans-serif` : 'Arial, sans-serif',
                                        fontFeatureSettings: '"salt" 1, "liga" 1, "dlig" 1',
                                    }}
                                    className="text-2xl"
                                >
                                    {text || 'Tên Cô Dâu Chú Rể'}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">{index + 1}. {font}</p>
                                <div className="flex gap-2 mt-1">
                                    <button
                                        onClick={() => handleRemoveFavorite(font)}
                                        className="text-base text-red-500 hover:text-red-600"
                                        aria-label={`Xóa font ${font} khỏi danh sách yêu thích`}
                                    >
                                       Bỏ thích
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}