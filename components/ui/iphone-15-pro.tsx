import { SVGProps } from "react";

export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
}

export default function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  ...props
}: Iphone15ProProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer Frame */}
      <path
        d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
        className="fill-[#1a1a1a]"
      />
      {/* Side Buttons */}
      <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" className="fill-[#4a4a4a]" />
      <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" className="fill-[#4a4a4a]" />
      <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" className="fill-[#4a4a4a]" />
      <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" className="fill-[#4a4a4a]" />

      {/* Inner Frame */}
      <path d="M6 74C6 35.34 37.34 4 76 4H356C394.66 4 426 35.34 426 74V808C426 846.66 394.66 878 356 878H76C37.34 878 6 846.66 6 808V74Z" className="fill-[#212020]" />
      
      {/* Display Border */}
      <path
        d="M21.25 75C21.25 44.21 46.21 19.25 77 19.25H355C385.79 19.25 410.75 44.21 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.21 862.75 21.25 837.79 21.25 807V75Z"
        className="fill-[#4a4a4a] stroke-[#3a3a3a] stroke-[0.5]"
      />

      {/* Screen */}
      {src && (
        <image
          href={src}
          x="21.25"
          y="19.25"
          width="389.5"
          height="843.5"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}
      {videoSrc && (
        <foreignObject x="21.25" y="19.25" width="389.5" height="843.5">
          <video
            className="size-full overflow-hidden rounded-[55.75px] object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </foreignObject>
      )}

      {/* Dynamic Island */}
      <path d="M154 48.5C154 38.28 162.283 30 172.5 30H259.5C269.717 30 278 38.28 278 48.5C278 58.717 269.717 67 259.5 67H172.5C162.283 67 154 58.717 154 48.5Z" className="fill-[#2a2a2a]" />
      <path d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z" className="fill-[#3b3b3b]" />
      <path d="M254 48.5C254 45.46 256.462 43 259.5 43C262.538 43 265 45.46 265 48.5C265 51.53 262.538 54 259.5 54C256.462 54 254 51.53 254 48.5Z" className="fill-[#242424]" />

      {/* Clip Path for Rounded Corners */}
      <defs>
        <clipPath id="roundedCorners">
          <rect x="21.25" y="19.25" width="389.5" height="843.5" rx="55.75" ry="55.75" />
        </clipPath>
      </defs>
    </svg>
  );
}
