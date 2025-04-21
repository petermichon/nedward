import { ovhConnect, ovhQuery } from './ovh.ts';
import { mongoConnect, mongoQuery } from './mongodb.ts';

export default function main() {
  {
    const promise = ovhConnect();

    promise.then(function (response) {
      const name = response.firstname;
      console.log('Welcome ' + name);
    });
  }

  {
    const promise = ovhQuery();

    promise.then(function (response) {
      const apps = response;
      console.log(apps);
    });
  }

  // mongoConnect();

  // mongoQuery();
}
