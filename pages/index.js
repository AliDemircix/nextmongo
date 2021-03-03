import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Image from "next/image";

const Index = ({ products }) => {
  return (
    <div>
      <h1 style={{ backgroundColor: "#f3d2a3", textDecorationStyle: "dashed" }}>
        Products
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          width: "90vw",
          margin: "auto",
        }}
      >
        {products.map((product) => {
          return (
            <div
              key={product._id}
              style={{
                flex: "28vw",
                border: "solid 1px rgba(30, 60, 40, .2)",
                marginBottom: "5px",
                margin: "10px",
                textAlign: "center",
                overflow: "visible",
              }}
            >
              <div style={{ padding: "10px" }}>
                <Link href={`/${product._id}`}>
                  <a>
                    <Image
                      src={`/images${product.image}`}
                      alt='{product.title}'
                      height={250}
                      width={250}
                    />
                  </a>
                </Link>
                <Link href={`/${product._id}`}>
                  <a>
                    <h1 style={{ color: "red" }}>{product.title}</h1>
                  </a>
                </Link>
                <p
                  style={{
                    backgroundColor: "lavender",
                    borderRadius: "6px",
                  }}
                >
                  {product.description}
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "navy",
                  }}
                >
                  {product.price}
                </p>
                <button
                  style={{
                    border: "none",
                    padding: "8px",
                    backgroundColor: "olive",
                    color: "white",
                    margin: "5px",
                  }}
                >
                  Add to Cart
                </button>
                {/* <Link href={`/${product._id}/edit`}>
                  <a>
                    <button
                      style={{
                        border: "none",
                        padding: "8px",
                        backgroundColor: "tomato",
                        color: "white",
                      }}
                    >
                      Edit
                    </button>
                  </a>
                </Link> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const { data } = await res.json();
  return { products: data };
};
export default Index;
