import DigitalClock from "../components/DigitalClock"

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-gray-50">
      <DigitalClock />

        {/* <Weather /> */}
        {/* <Calender /> */}
    </div>
  )
}

export default Home
