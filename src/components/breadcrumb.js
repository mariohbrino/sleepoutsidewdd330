export function getBreadcrumbTemplate() {
  const pathArray = window.location.pathname.split("/").filter((item) => item);

  // Using backticks (`) allows the string to span multiple lines without errors
  let breadcrumbHTML = `<nav aria-label="Breadcrumb">
    <ol style="display: flex; list-style: none; gap: 10px; padding: 0;">
      <li><a href="/">Home</a></li>`;

  let path = "";
  pathArray.forEach((segment, index) => {
    path += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    if (index === pathArray.length - 1) {
      breadcrumbHTML += `<li> > ${label}</li>`;
    } else {
      breadcrumbHTML += `<li> > <a href="${path}">${label}</a></li>`;
    }
  });

  breadcrumbHTML += `</ol></nav>`;
  return breadcrumbHTML;
}
