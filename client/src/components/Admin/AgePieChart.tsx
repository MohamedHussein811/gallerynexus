import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

export default function AgePieChart({ users }: any) {
  const [ageData, setAgeData] = useState<
    { id: string; value: any; label: string }[]
  >([]);


  const calculateAgeData = () => {
    const ages = users.map((user: { age: string | number | Date }) => {
      const birthDate = new Date(user.age);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      return age;
    });

    const ageDistribution = ages.reduce((acc: any, age: any) => {
      const ageGroup = getAgeGroup(age);
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {});

    const ageChartData = Object.keys(ageDistribution).map((key) => ({
      id: key,
      value: ageDistribution[key],
      label: `Age: ${key}`,
    }));

    setAgeData(ageChartData);
  };


  useEffect(() => {
    calculateAgeData();
  }, [users]);


  const getAgeGroup = (age: any) => {
    if (age >= 21 && age <= 50) {
      return "21-50";
    } else if (age >= 10 && age <= 20) {
      return "10-20";
    } else {
      return "> 50";
    }
  };

  return (
    <div className="bg-white rounded-[20px] p-4 w-fit shadow ml-2 my-2 flex flex-col ">
      <h1 className="text-black font-bold flex ">Age Pie chart</h1>
      <PieChart
        colors={["#00B7CD", "#C100FF", "#003BCD"]}
        series={[{ data: ageData }]}
        width={400}
        height={200}
      />
    </div>
  );
}
