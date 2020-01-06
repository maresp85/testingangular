import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { of } from 'rxjs';
import { User } from './models/user.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'


describe('AppComponent', () => {
  let appComponent;
  let userService;
  
  beforeAll(()=>{
    console.log('se ejecuta al iniciar las pruebas');
  })

  afterAll(()=>{
    console.log('se ejecuta al finalizar las pruebas');
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        UserService,
        AppComponent
      ],
      imports:[
        HttpClientTestingModule
      ]
    }).compileComponents();
    appComponent = TestBed.get(AppComponent)
    userService = TestBed.get(UserService)
  }));

  afterEach(()=>{
    console.log('afterEach')
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('El valor myVar debe ser hola Mundo', ()=>{
    const valor = appComponent.myVar
    expect(valor).toEqual('Hola Mundo')
  })

  it('El valor nombre debe contener Mario', ()=>{
    const valor = appComponent.saludo
    expect(valor).toContain('Mario')
  })

  it('Debe retornar TRUE', () => {
    const respuesta = appComponent.par(44)
    expect(respuesta).toBeTruthy()
  })

  it('Debe llamar a UserService y obtener los usuarios', ()=>{
    
    let mockUser:User[] = [{
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/mojombo",
      login: "mojombo",
      html_url: "https://github.com/mojombo",
      followers_url: "https://api.github.com/users/mojombo/followers",
      following_url: "https://api.github.com/users/mojombo/following{/other_user}",
      gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
      starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
      organizations_url: "https://api.github.com/users/mojombo/orgs",
      repos_url: "https://api.github.com/users/mojombo/repos",
      events_url: "https://api.github.com/users/mojombo/events{/privacy}",
      received_events_url: "https://api.github.com/users/mojombo/received_events",
      type: "User",
      site_admin: false
    }];
    
    const users = spyOn(userService, 'getAll').and.callFake(users=>{
      return of(mockUser)
    })

    appComponent.ngOnInit()

    expect(users).toHaveBeenCalled
  })

});
