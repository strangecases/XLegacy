// import axios from "axios";

const section = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <input type="text" />
                <input type="text" placeholder="option-1" />
                <input type="text" placeholder="option-2" />
                <input type="text" placeholder="option-3" />
                <input type="text" placeholder="option-4" />
                <input type="text" placeholder="right answer" />
            </div>
            <div className="formGroup">
                <input type="text" />
                <input type="text" placeholder="option-1" />
                <input type="text" placeholder="option-2" />
                <input type="text" placeholder="option-3" />
                <input type="text" placeholder="option-4" />
                <input type="text" placeholder="right answer" />
            </div>
            <button type="submit">submit</button>
        </form>
    );
};
export default section;
