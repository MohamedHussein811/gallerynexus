import { Correct } from "../../SVG/SVG";

export function ArtInfo(props:any) {
    return (
      <div className="p-2 flex flex-row">
        <svg
          version="1.1"
          width="20"
          height="20"
          viewBox="0 0 256 256"
          className="mr-2"
        >
          <Correct />
        </svg>
        <p className="mr-2">{props?.Info}</p>
      </div>
    );
  }