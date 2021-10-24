function ListItemField(props) {
    return <input type={"text"}
        className={props.field}
        onChange={
            event=>props.onListItemFieldChanged(props.id, props.field, event.target.value)
        }
        value={props[props.field]} />
}
export default ListItemField;
