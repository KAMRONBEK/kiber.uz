import { Worker } from "@react-pdf-viewer/core";
import { CircularProgress } from "@mui/material";
//@ts-ignore
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

// @ts-ignore
const MPDFViewer = ({ url, isVisible }) => {
  if (!url) return null;

  return (
    <div
      style={{ width: "100%", backgroundColor: "#838689", paddingTop: "30px" }}
    >
      {/* <PDFViewer
        // @ts-ignore
        document={{ url }}
        style={{ width: "100%" }}
        loader={<CircularProgress />}
      /> */}
      {/* @ts-ignore */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
        <Viewer fileUrl={url} />
      </Worker>
    </div>
  );
};

export default MPDFViewer;
