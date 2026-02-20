import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

/*
function App() {
  return (
    <>
      <Header tagline="Find the right resources, right away" />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
        <div className="w-full">
          <Filters />
        </div>
        <div className="w-full">
          <Results />
        </div>
        <div className="w-full">
          <Details />
        </div>
      </div>
    </>
  );
}
*/

export default function App() {
  return (
    <PageLayout
      header={<Header tagline="Find the right resources, right away" />}
      left={<Filters />}
      middle={<Results />}
      right={<Details />}
    />
  );
}

/**
 * Composition through named slots
Clear separation between layout and content
App as a container that assembles the page
After this change, App.jsx should read like a page blueprint, not a layout implementation.
 */