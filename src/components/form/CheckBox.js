const CheckBox = (props) => {
    return (
        <div className="form-check">
            <input 
                id={props.name}
                className="form-check-input"
                type="checkbox"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                checked={props.checked}
            />
            <lable className="form-check-lable" htmlFor={props.name}>
                {props.title}
            </lable>
        </div>
    )
}

export default CheckBox;