export default function DashboardGrid({title, value, Icon}:any) {
  return (
    <div className="bg-white p-4 rounded-[20px] shadow flex-row flex">
      <div className="rounded-full w-fit p-3 bg-blue-200">
        {Icon}
      </div>
      <div className="flex flex-col pl-2">
        <h2 className="text-lg font-semibold text-gray-500">{title}</h2>
        <p className="text-xl text-black font-bold">{value}</p>
      </div>
    </div>
  );
}
