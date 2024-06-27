import {
  ChangeEvent,
  FormEvent,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Contact } from "../../type";

const ContactList = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);

  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [refles, setRefles] = useState(true);

  const saveLocalStorg = async () => {
    localStorage.setItem("ContactList", JSON.stringify(contactList));
    setRefles(!refles);
  };

  const changePhoneValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneInputValue(e.target.value);
  };
  const changeNameValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.target.value);
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let checkAdd = true;

    contactList.forEach((element) => {
      if (element.phone == phoneInputValue) {
        element.name = nameInputValue;
        checkAdd = false;
        saveLocalStorg();
      }
    });

    if (checkAdd) {
      const contact: Contact = {
        phone: phoneInputValue,
        name: nameInputValue,
      };

      const newCo = [...contactList, contact];

      setContactList(newCo);
      saveLocalStorg();
      console.dir(newCo);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("ContactList")) {
      localStorage.setItem("ContactList", JSON.stringify(contactList));
    } else {
      setContactList(JSON.parse(localStorage.getItem("ContactList") as string));
    }
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Phone"
          value={phoneInputValue}
          onChange={changePhoneValue}
        />
        <input
          type="text"
          placeholder="Name"
          value={nameInputValue}
          onChange={changeNameValue}
        />

        <button type="submit">Submit</button>
      </form>

      <ul>
        {contactList.map((element) => {
          const deleteContact = () => {
            setContactList(
              contactList.filter((elemt) => {
                return elemt.phone !== element.phone;
              })
            );
          };

          return (
            <li key={element.phone}>
              <p>{element.phone}</p>
              <p>{element.name}</p>

              <button onClick={deleteContact}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
