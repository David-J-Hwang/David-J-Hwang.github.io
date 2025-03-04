import Button from "../../components/Button";

function Blogs() {
  return (
    <div>
      <h1 className="text-6xl text-center py-18">This is Blogs page!</h1>
      <Button to="/blogs/markdown">마크다운 문서 작성법</Button>
    </div>
  );
}

export default Blogs;
