export default function FontListPreview({
  fonts,
  brideGroomName,
  dark = true,
  rowsPerCol = 10,
  fontSize = 20,
}) {
  if (!fonts || fonts.length === 0) return null;

  const numCols = Math.ceil(fonts.length / rowsPerCol);
  const colsData = Array.from({ length: numCols }, (_, colIdx) =>
    fonts.slice(colIdx * rowsPerCol, (colIdx + 1) * rowsPerCol)
  );
  const textToShow = brideGroomName || "Tên Cô Dâu & Chú Rể";

  return (
    <div
      style={{
        width: Math.max(450 * numCols, 600),
        minHeight: 120 + rowsPerCol * 30,
        padding: 5,
        background: dark ? "#24272b" : "#fff",
        color: dark ? "#fff" : "#000",
        fontFamily: "sans-serif",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontWeight: 500, fontSize: 30, marginBottom: 18, marginLeft: 10 }}>
        Bộ font text: {textToShow}
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          paddingBottom: 64,
          overflowX: "auto",
        }}
      >
        {colsData.map((col, colIdx) => (
          <div key={colIdx} style={{ minWidth: 340 }}>
            {col.map((font, rowIdx) => {
              const globalIdx = colIdx * rowsPerCol + rowIdx;
              return (
                <div
                  key={font}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: fontSize + 11,
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 20,
                      width: 36,
                      color: "#bbb",
                      fontWeight: 500,
                      flexShrink: 0,
                      textAlign: "right",
                      marginRight: 10,
                    }}
                  >
                    {globalIdx + 1}.
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline", // đây là điểm chính
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: `${font}, Arial, sans-serif`,
                        fontSize,
                        color: dark ? "#fff" : "#000",
                        lineHeight: 1.35,
                        textShadow: dark ? "0 1px 1px #0006" : "none",
                        whiteSpace: "nowrap",
                        maxWidth: 240,
                        borderBottom: "1px dashed #444",
                        paddingBottom: 3,
                        paddingTop: 2,
                      }}
                      title={textToShow}
                    >
                      {textToShow}
                    </span>
                    <span
                      style={{
                        color: "#aaa",
                        fontSize: 12,
                        marginLeft: 6,
                         paddingTop: 6,   
                        fontStyle: "italic",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ({font})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          textAlign: "left",
          fontSize: 17,
          color: "#ccc",
          position: "absolute",
          left: 32,
          bottom: 14,
        }}
      >
        Sưu tầm bởi Cưới Hỏi Kinh Bắc | font.cuohoibacgiang.com
      </div>
    </div>
  );
}
