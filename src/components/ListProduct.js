import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  Table,
} from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { getListColors, getListProducts } from "../actions/productActions";
import Pagination from "./Pagination";

export default function ListProduct() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const getAPI = async () => {
      const res1 = await getListProducts();
      const res2 = await getListColors();
      if (res1) {
        setProducts(res1);
      }
      if (res2) {
        setColors(res2);
      }
    };
    getAPI();
  }, []);

  const handleChange = (e, product) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? { ...p, [e.target.name]: e.target.value, checked: true }
          : p
      )
    );
  };

  const handleColor = (product, color) => {
    console.log(product.id, color);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, color: color, checked: true } : p
      )
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products">
        <Navbar collapseOnSelect expand="lg" color="black" bg="variant">
          <Container>
            <Nav>
              <h3>Jason - Re-upload Error Products</h3>
            </Nav>
            <Nav>
              <Button onClick={handleShow}>
                <FiUpload style={{ marginRight: "10px", marginTop: "-3px" }} />
                Submit
              </Button>
            </Nav>
          </Container>
        </Navbar>

        <Table
          bordered
          hover
          style={{ textAlign: "center", verticalAlign: "middle" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Error Description</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts &&
              currentPosts.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.errorDescription}</td>
                    <td>
                      {
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100px" }}
                        />
                      }
                    </td>
                    <td>
                      <input
                        name="name"
                        maxLength="50"
                        onChange={(e) => handleChange(e, product)}
                        value={product.name}
                      />
                    </td>
                    <td>
                      <input
                        name="sku"
                        maxLength="10"
                        onChange={(e) => handleChange(e, product)}
                        value={product.sku}
                      />
                    </td>
                    <td>
                      <InputGroup className="mb-3">
                        <DropdownButton
                          variant="outline-secondary"
                          title={
                            !product.color
                              ? "Select value"
                              : colors.map((color) =>
                                  color.id === product.color ? color.name : null
                                )
                          }
                          id="input-group-dropdown"
                        >
                          {colors.map((color, index) =>
                            color.id !== product.color ? (
                              <Dropdown.Item
                                key={index}
                                onClick={() => handleColor(product, color.id)}
                              >
                                {color.name}
                              </Dropdown.Item>
                            ) : null
                          )}
                        </DropdownButton>
                      </InputGroup>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={products.length}
          paginate={paginate}
        />
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          scrollable={true}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Re-uploaded Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {products.map((item, index) => {
              if (item.checked) {
                return (
                  <div
                    style={{ display: "flex", borderBottom: "1px solid #bbb" }}
                    key={index}
                  >
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "70px", marginRight: "20px" }}
                      />
                    </div>
                    <div>
                      <b>{item.name}</b>
                      <div>ID: {item.id}</div>
                      <div>
                        SKU: <span style={{ color: "red" }}>{item.sku}</span>
                      </div>
                      <div>
                        <span>Color: </span>
                        {colors.map((color) =>
                          color.id === item.color ? color.name : null
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else return "";
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}
