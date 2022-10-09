export default function Input({ inputProps, label }) {
  return (
    <label>
      <span className="inline-block w-12 text-left text-sm uppercase">
        {label}
      </span>
      <input
        {...inputProps}
        className="w-80 border-transparent border-b-black placeholder:text-gray-300"
      />
    </label>
  );
}
