import './style.scss';

function Person({person}) {


  return (
    <li className="person">
      <ul>
        <li>
          <span>{person.name} </span>
          <span>{person.lastname}</span>
        </li>
        <li>
          Возраст: {person.age}
        </li>
        <li>
          Пол: {person.sex === 'f' ? 'женский' : 'мужской'}
        </li>
      </ul>
    </li>
  )
}

export {
  Person
}