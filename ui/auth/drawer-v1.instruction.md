# Quran Drawer Menu v1

## Purpose
Responsive right-side profile drawer using semantic HTML, CSS and vanilla JavaScript.

## Required IDs
- drawerOverlay
- drawerMenu
- drawerAvatarImg
- drawerUserName
- drawerUserEmail

## Protected behavior
- openDrawer() opens drawer and overlay.
- closeDrawer() closes drawer and overlay.
- Escape closes the drawer.
- Overlay click closes the drawer.
- Logout clears authUser and closes the drawer.
- No external libraries or frameworks.

## Integration
- Header profile trigger should call openDrawer().
- Avatar trigger calls openAvatarModal() when the existing avatar modal is available.
- This component is standalone; it must not replace existing login/avatar files.

## Change policy
Test before merge or live publication. Do not publish an untested version.