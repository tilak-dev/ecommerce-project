export const InputChangedEvent = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  event.preventDefault();
  const target = event.target.value;
  return target
};