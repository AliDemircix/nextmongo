import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Confirm, Button} from "semantic-ui-react";
import Image from "next/image";

const Product = ({ product }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteProduct();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);

  const close = () => setConfirm(false);

  const deleteProduct = async () => {
    const productId = router.query.id;
    try {
      const deleted = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "Delete",
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    console.log(isDeleting);
    setIsDeleting(true);
    close();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "solid 1px navy",
      }}
    >
      {isDeleting ? (
        console.log("Deleting")
      ) : (
        <>
          <Image
            src={`/images${product.image}`}
            alt='{product.title}'
            height={250}
            width={250}
          />
          <div
            style={{
              margin: "5px",
              padding: "10px",
            }}
          >
            <h1>{product.title}</h1> <hr></hr>
            <p>
              <b>Product Price:</b>{" "}
              <span style={{ color: "tomato", fontWeight: "bolder " }}>
                {product.price}
              </span>
            </p>
            <p>
              <b>Product Info :</b>
              <span
                style={{ color: "navy", fontWeight: "bolder ", margin: "5px" }}
              >
                {product.description}
              </span>
            </p>
            <p>
              <b>Product STU :</b>
              <span
                style={{ color: "navy", fontWeight: "bolder ", margin: "5px" }}
              >
                {product._id}
              </span>
            </p>
            <Button size='tiny' inverted color='red' onClick={open}>
              Delete
            </Button>
            <Link href={`/${product._id}/edit`}>
              <a>
                <Button size='tiny' inverted color='blue'>
                  Edit
                </Button>
              </a>
            </Link>
          </div>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

Product.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const { data } = await res.json();

  return { product: data };
};

export default Product;
