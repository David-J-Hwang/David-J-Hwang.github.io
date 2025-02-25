import DigitalClock from "../components/DigitalClock"

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <DigitalClock />

      <div className="flex justify-center gap-4 mt-8">
        {/* <Weather />
        <Calender /> */}
      </div>
    </div>
  )
}

export default Home
