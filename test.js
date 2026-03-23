test('page loads', () => {
  document.body.innerHTML = '<h1>Test</h1>';
  expect(document.querySelector('h1').textContent).toBe('Test');
});
