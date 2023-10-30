import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBloodsQuery } from "../slices/bloodsApiSlice";
import Blood from "./Blood";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const { data, isLoading, error } = useGetBloodsQuery({ keyword });

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      if (data.bloods.length > 0) {
        console.log(data.bloods);
        navigate(`/Blood/search/${keyword.trim()}`);
        setKeyword("");
        toast.success("Donor Found!");
      } else {
        toast.error("Donor Not Found");
        navigate("/Blood");
      }
    } else {
      toast.error("Donor Not Found");
      navigate("/Blood");
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search Donor..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2 mx-2">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
