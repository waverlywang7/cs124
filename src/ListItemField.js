function ListItemField(props) {
    return <input
        className={props.className}
        type="text"
        onChange={props.onChange}
        value={props.value} />
}
export default ListItemField;
