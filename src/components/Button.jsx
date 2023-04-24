const Button = ({ styles, text, onClick }) =>
  (
    <button type='button' className={`py-4 px-6
    bg-blue-gradient font-poppins font-medium text-[18px]
    text-primary outline-none ${styles} rounded-[10px]`}
    onClick={onClick}>
    {text}
    </button>
  );

export default Button;