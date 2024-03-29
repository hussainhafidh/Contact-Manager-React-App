import { useState } from "react";

function Form({ contacts, addContacts }) {
  const initialValues = { full_name: "", phone_number: "" };
  const [form, setForm] = useState(initialValues);

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
  
    if (form.full_name === "" || form.phone_number === "") {
      alert("Please fill in the blanks!");
      return; // Prevent further execution if fields are empty
    }
  
    // Ensure contacts is an array before spreading it
    const updatedContacts = Array.isArray(contacts) ? [...contacts, form] : [form];
    console.log("Submitting form with data:", form);

    addContacts(updatedContacts);
    setForm(initialValues);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div>
        <input
          onChange={onChangeInput}
          value={form.full_name}
          name="full_name"
          type="text"
          placeholder="Full Name"
        />
      </div>
      <div>
        <input
          onChange={onChangeInput}
          value={form.phone_number}
          name="phone_number"
          type="number"
          placeholder="Phone Number"
          maxLength="10"
        />
      </div>
      <div id="button">
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default Form;
