import { useEffect, useState, useCallback } from "react";
import { fetchData } from "./api/fetchData";

import { Person } from "./components/Person";
import "./app.scss";

function App() {
  const [people, setPeople] = useState([]);

  const [filteredPeople, setFilteredPeople] = useState([]);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    age: "",
    sex: {
      f: false,
      m: false,
    },
  });

  const fetchPeople = useCallback(async () => {
    const data = await fetchData();
    setPeople(data);
    return data;
  }, []);

  const handleFilter = useCallback(() => {
    if (people) {
      const arr = people.filter((person) => {
        if (form.name && !person.name.includes(form.name)) return false;
        if (form.lastName && !person.lastname.includes(form.lastName))
          return false;
        if (form.age && person.age !== +form.age) return false;
        if (form.sex.m && person.sex !== "m") return false;
        if (form.sex.f && person.sex !== "f") return false;

        return true;
      });
      return setFilteredPeople(arr);
    }
  }, [form, people]);

  const handleReset = (e) => {
    setForm({
      name: "",
      lastName: "",
      age: "",
      sex: {
        f: false,
        m: false,
      },
    });
    e.preventDefault();
  };

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <div className="app">
      <form className="form">
        <div className="form__options">
          <h3 className="form__name">Фильтр списка</h3>
          <button className="form__button" onClick={(e) => handleReset(e)}>
            Сбросить фильтр
          </button>
        </div>

        <div className="form--container">
          <label className="form__item">
            <span className="form__item--title">Имя</span>
            <input
              className="form__input--text"
              type="text"
              placeholder="Введите имя"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value.trim() })
              }
            />
          </label>
          <label className="form__item form__item--app">
            <span className="form__item--title">Фамилия</span>
            <input
              className="form__input--text"
              type="text"
              placeholder="Введите фамилию"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value.trim() })
              }
            />
          </label>
          <label className="form__item form__item--app">
            <span className="form__item--title">Возраст</span>
            <input
              className="form__input--text"
              type="text"
              placeholder="Введите возраст"
              value={form.age}
              onChange={(e) =>
                setForm({ ...form, age: e.target.value.replace(/\D/, "") })
              }
            />
          </label>

          <div className="form__item form__item--fieldset form__item--app">
            <legend className="form__item--title">Пол</legend>

            <label className="form__label--checkbox app__label--checkbox">
              <input
                className="form__input--checkbox "
                type="checkbox"
                id="m"
                checked={form.sex.m}
                onChange={() =>
                  setForm({ ...form, sex: { ...form.sex, m: !form.sex.m } })
                }
              />
              <span className="form__label--title">м</span>
            </label>

            <label className="form__label--checkbox app__label--checkbox">
              <input
                className="form__input--checkbox"
                type="checkbox"
                id="f"
                checked={form.sex.f}
                onChange={() =>
                  setForm({ ...form, sex: { ...form.sex, f: !form.sex.f } })
                }
              />
              <span className="form__label--title">ж</span>
            </label>
          </div>
        </div>
      </form>

      {!people ||
        (people.length === 0 && (
          <p className="app__error">Что-то пошло не так 🧐</p>
        ))}

      {people.length > 0 && filteredPeople.length === 0 && (
        <p className="app__error">Совпадений не найдено 😐</p>
      )}

      {filteredPeople && filteredPeople.length > null && (
        <ul className="app__list">
          {filteredPeople.map((person) => {
            return (
              <Person key={filteredPeople.indexOf(person)} person={person} />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { App };
