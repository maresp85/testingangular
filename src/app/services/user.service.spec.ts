import { TestBed, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { User } from '../models/user.interface';

describe('UserService', () => {
  let injector:TestBed
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    })
    injector = getTestBed()
    httpMock = injector.get(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('Debe retornar un observable<User[]>', ()=>{
    const service:UserService = TestBed.get(UserService)
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

    service.getAll().subscribe((users) =>{
      expect(users.length).toBe(1)
      expect(users).toEqual(mockUser)
      expect(users[0].login).toBeDefined()
    })

    const req = httpMock.expectOne('https://api.github.com/users')
    expect(req.request.method).toBe('GET')
    req.flush(mockUser)

  })

});
