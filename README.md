https://angular.io/docs/ts/latest/guide/router.html

src/app/heroes/heroes-routing.module.ts

    import { NgModule }             from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { HeroListComponent }    from './hero-list.component';
    import { HeroDetailComponent }  from './hero-detail.component';
    const heroesRoutes: Routes = [
      { path: 'heroes',  component: HeroListComponent },
      { path: 'hero/:id', component: HeroDetailComponent }
    ];
    @NgModule({
      imports: [
        RouterModule.forChild(heroesRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class HeroRoutingModule { }

Put the routing module file in the same folder as its companion module file. Here both heroes-routing.module.ts and heroes.module.ts are in the same src/app/heroes folder.

Consider giving each feature module its own route configuration file. It may seem like overkill early when the feature routes are simple. But routes have a tendency to grow more complex and consistency in patterns pays off over time.

Import the hero components from their new locations in the src/app/heroes/ folder, define the two hero routes, and export the HeroRoutingModule class.

Now that you have routes for the Heroes module, register them with the Router via the RouterModule almost as you did in the AppRoutingModule.

There is a small but critical difference. In the AppRoutingModule, you used the static RouterModule.forRoot method to register the routes and application level service providers. In a feature module you use the static forChild method.

Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if that's where you register top level application routes). In any other module, you must call the RouterModule.forChild method to register additional routes.
