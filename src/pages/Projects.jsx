import Button from "../components/Button"


function Projects() {
  return (
    <div>
      <h1 className="text-6xl text-center py-18">This is Projects page!</h1>
      <Button to='/projects/get-weather'>Get Weather</Button>
    </div>
  )
}

export default Projects
