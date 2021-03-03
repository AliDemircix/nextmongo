import Link from "next/link";

const Navbar = () => (
  <nav
    className='navbar'
    style={{
      display: "flex",
      backgroundColor: "lavender",
      padding: "15px",
      justifyContent: "space-between",
    }}
  >
    <Link href='/'>
      <a
        style={{
          padding: "10px",
          border: "dashed 1px",
          borderRadius: "6px",
          fontWeight: "bolder",
        }}
      >
        {" "}
        Home Page
      </a>
    </Link>
    <Link href='/new'>
      <a
        style={{
          padding: "10px",
          border: "dashed 1px olive",
          fontWeight: "bolder",
          color: "olive",
          borderRadius: "6px",
        }}
      >
        {" "}
        Create Product
      </a>
    </Link>
  </nav>
);
export default Navbar;
