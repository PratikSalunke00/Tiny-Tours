function Avatar({ name, size = "medium" }) {
  return (
    <span
      className={`bg-black text-white flex items-center justify-center h-${size} w-${size} rounded-full mr-2`}
    >
      {name[0]}
    </span>
  );
}

export default Avatar;