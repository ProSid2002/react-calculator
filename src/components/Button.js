const Button = ({ color, bgColor, content, onClick }) => {
  return (
    <button onClick={onClick} style={{ color, backgroundColor: bgColor }}>
      {content}
    </button>
  );
};

export default Button;
