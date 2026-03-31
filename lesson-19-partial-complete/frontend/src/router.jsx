/// This file will hold:
// the router configuration
// route loaders
// route actions
// We are moving toward a router object instead of JSX route declarations inside main.jsx.
// adding a small API helper section.
// These helpers will be reused by loaders and actions.

const API_BASE_URL = 'http://localhost:3000';

async function fetchResources() {
  const res = await fetch(`${API_BASE_URL}/resources`);

  if (!res.ok) {
    throw new Error(`Could not load resources: ${res.status}`);
  }

  return res.json();
}

async function fetchResourceById(resourceId) {
  const res = await fetch(`${API_BASE_URL}/resources/${resourceId}`);

  if (!res.ok) {
    throw new Error(`Could not load resource: ${res.status}`);
  }

  return res.json();
}


//Create loaders for the directory and admin routes
export async function resourceDirectoryLoader() {
  const resources = await fetchResources();
  return { resources };
}

export async function adminLoader({ params }) {
  const resources = await fetchResources();

  if (!params.resourceId) {
    return {
      resources,
      resourceId: null,
      selectedResource: null,
    };
  }

  const selectedResource = await fetchResourceById(params.resourceId);

  return {
    resources,
    resourceId: params.resourceId,
    selectedResource,
  };
}

///Important ideas:
// the directory route only needs the full list
// the admin route needs the list and, sometimes, one selected resource
// params is available inside the loader just like route parameters are available inside components


// add an action that handles both create and update.
// This action does the same work your manual submit handler used to do,
//  but now it belongs to the route.

import { redirect } from 'react-router';

export async function adminAction({ request, params }) {
  const formData = await request.formData();

  const payload = {
    title: formData.get('title'),
    category: formData.get('category'),
    summary: formData.get('summary'),
    location: formData.get('location'),
    hours: formData.get('hours'),
    contact: formData.get('contact'),
    virtual: formData.get('virtual') === 'on',
    openNow: formData.get('openNow') === 'on',
  };

  const isEditing = Boolean(params.resourceId);
  const url = isEditing
    ? `${API_BASE_URL}/resources/${params.resourceId}`
    : `${API_BASE_URL}/resources`;
  const method = isEditing ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
  }

  const savedResource = await res.json();

  return redirect(`/admin/${savedResource.id}`);
}




//Now build the router object
//We now have route definitions that include:
// element
// loader
// action

import App from './App';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';
import {
  createBrowserRouter,
} from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ResourceDirectoryPage />,
        loader: resourceDirectoryLoader,
      },
      {
        path: 'admin',
        element: <AdminPage />,
        loader: adminLoader,
        action: adminAction,
      },
      {
        path: 'admin/:resourceId',
        element: <AdminPage />,
        loader: adminLoader,
        action: adminAction,
      },
    ],
  },
]);


