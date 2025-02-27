import DigitalClock from "../components/DigitalClock";
import Button from "../components/Button";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-gray-50">
      <DigitalClock />

      <div className="mt-8 flex flex-row justify-center items-center gap-4">
        <Button to={"https://youtube.com"}>Youtube</Button>
        <Button to="https://naver.com">Naver</Button>
        <Button to="https://map.naver.com">Naver Maps</Button>
        <Button to="https://land.naver.com">Naver Real Estate</Button>
      </div>

      {/* <Weather /> */}
      {/* <Calender /> */}
    </div>
  );
}

export default Home;
