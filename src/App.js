import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log("data", data);
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const selectPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {products.length > 0 && (
        <div className="products__list">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="products_item" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={selectPrevPage}
            className={page === 1 ? "hide_left" : ""}
          >
            ⬅️
          </span>
          {/* print values from 1 to n(product in one page) */}
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                onClick={() => selectPageHandler(index + 1)}
                className={index + 1 === page ? "selected_button" : ""}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            className={page === products.length / 10 ? "hide_right" : ""}
            onClick={() => (page < 10 ? setPage(page + 1) : "")}
          >
            ➡️
          </span>
        </div>
      )}
    </>
  );
}
