export default function FormField({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  accept,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        accept={accept}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
