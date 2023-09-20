type ButtonProps = {
  name: string;
  type?: 'submit' | 'button';
  variant?: string;
  size: string;
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  const { name, type, onClick, variant, size } = props;
  return (
    <>
      <div className="flex justify-center my-5">
        <button type={type} className={`btn ${variant ? variant : 'btn-primary'} ${size}`} onClick={onClick}>
          {name}
        </button>
      </div>
    </>
  );
}
