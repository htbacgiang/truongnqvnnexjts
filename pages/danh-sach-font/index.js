import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import html2canvas from "html2canvas";
import FontListPreview from "../../components/common/FontListPreview"; // Adjust path if needed

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('vi-VN');
}

// Function to remove Vietnamese diacritics
function removeDiacritics(str) {
  return str
    .normalize('NFD') // Decompose diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
    .replace(/đ/g, 'd') // Replace 'đ' with 'd'
    .replace(/Đ/g, 'D'); // Replace 'Đ' with 'D'
}

export default function AdminFonts() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const previewRefs = useRef({});

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/admin-favorites')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((res) => setData(Array.isArray(res.data) ? res.data : []))
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setIsLoading(false));

    // Cleanup refs on unmount
    return () => {
      previewRefs.current = {};
    };
  }, []);

  const handleExportImage = async (deviceId) => {
    const ref = previewRefs.current[deviceId];
    if (!ref) return;

    const row = data.find((item) => item.deviceId === deviceId);
    if (!row) return;

    // Remove diacritics and sanitize brideGroomName for valid filename
    const sanitizedName = row.brideGroomName
      ? removeDiacritics(row.brideGroomName)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      : 'unnamed';

    try {
      const canvas = await html2canvas(ref, { backgroundColor: null, scale: 2 });
      const link = document.createElement('a');
      link.download = `font-preview-${sanitizedName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Head>
        <title>Admin - Danh sách Font đã lưu</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách Font của TẤT CẢ người dùng</h1>
      {isLoading ? (
        <div className="text-center">
          <span className="inline-block animate-spin h-6 w-6 border-4 border-t-transparent border-gray-500 rounded-full" />
          <span className="ml-2">Đang tải...</span>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th scope="col" className="border px-3 py-2 text-left">#</th>
                <th scope="col" className="border px-3 py-2 text-left">Tên cô dâu chú rể</th>
                <th scope="col" className="border px-3 py-2 text-left">Font đã chọn</th>
                <th scope="col" className="border px-3 py-2 text-left">Ngày tạo</th>
                <th scope="col" className="border px-3 py-2 text-left">Xuất ảnh</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.deviceId}>
                  <td className="border px-3 py-2">{i + 1}</td>
                  <td className="border px-3 py-2">{row.brideGroomName || <i className="text-gray-400">Chưa nhập</i>}</td>
                  <td className="border px-3 py-2">
                    {row.fonts && row.fonts.length > 0
                      ? row.fonts.join(', ')
                      : <span className="text-gray-400">Không có</span>
                    }
                  </td>
                  <td className="border px-3 py-2">{formatDate(row.createdAt)}</td>
                  <td className="border px-3 py-2">
                    {row.fonts && row.fonts.length > 0 && (
                      <>
                        <button
                          className="px-2 py-1 bg-pink-500 text-white rounded hover:bg-gray-600 whitespace-nowrap"
                          onClick={() => handleExportImage(row.deviceId)}
                          aria-label={`Export font preview for ${row.brideGroomName || 'unnamed'}`}
                        >
                          Tạo ảnh
                        </button>
                        {/* Preview hidden for export */}
                        <div style={{ position: "absolute", left: -9999, top: 0 }}>
                          <div ref={el => previewRefs.current[row.deviceId] = el}>
                            <FontListPreview
                              fonts={row.fonts}
                              brideGroomName={row.brideGroomName}
                              rowsPerCol={10}
                              fontSize={20}
                              dark
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 p-4">
                    Không có dữ liệu. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}