type Login = {
    id: string;
    type: string;
    placeholder: string;
    label: string;
    onChange?: (e: any) => void;
};

export default function Form(props: Login) {
    const { id, type, placeholder, label, onChange } = props;
    return (
        <div>
            <div className="form-control">
                <label id={id} className="label after:content-['*'] after:text-red-600 justify-start">
                    {label}
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    className="input input-bordered w-full"
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    );
}
