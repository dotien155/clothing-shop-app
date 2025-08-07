function FormErrs(props) {

    function renderErrs() {
        let { errs } = props;
        if (Object.keys(errs).length > 0) {
            return Object.keys(errs).map((key, index) => {
                return (
                    <li key={index}>{errs[key]}</li>
                )
            })
        }
    }


    return (
        <ul>{renderErrs()}</ul>
    )
}
export default FormErrs;