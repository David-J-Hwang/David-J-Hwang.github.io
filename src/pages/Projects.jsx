import Button from "../components/Button";

function Projects() {
  return (
    <div>
      <h1 className="text-6xl text-center pt-24">This is Projects page!</h1>
      <div className="mt-18 flex flex-col items-center justify-center gap-4">
        <Button to="/projects/get-weather">Get Weather</Button>
        <Button to="https://david-j-hwang.github.io/analog-clock">
          Analog Clock
        </Button>
        <Button to="https://david-j-hwang.github.io/digital-clock">
          Digital Clock
        </Button>
      </div>
    </div>
  );
}

export default Projects;
