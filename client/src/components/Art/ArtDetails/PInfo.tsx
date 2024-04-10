export default function PInfo({title,size,price}:any){
    const textStyle = { fontFamily: "Crimson Text, serif" };

    return (
        <div className="p-4">
        <p
          className="text-lg font-semibold text-gray-200 mb-2"
          style={textStyle}
        >
          {title}
        </p>
        <p className="text-sm text-gray-100 mb-1" style={textStyle}>
          Size: {size}
        </p>
        <p className="text-lg text-gray-100" style={textStyle}>
          ${parseFloat(price).toFixed(2)}
        </p>
      </div>
    );
}