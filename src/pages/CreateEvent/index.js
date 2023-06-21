import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateEvent() {
  const navigate = useNavigate;
  const [form, setForm] = useState({
    eventName: "",
    date: "",
    local: "",
    categories: "",
    picture: "",
    description: "",
  });
}
