using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Helper;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly VoteAppDBContext context = new();

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var isExist = context.Users.Where(x => x.Email == user.Email).FirstOrDefault();
            if (isExist != null)
            {
                return BadRequest(new { message = "Email is existed" });
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Ok("success");

        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var existUser = context.Users.Where(x => x.Email == user.Email).FirstOrDefault();
            if (existUser == null)
            {
                return Ok(new { message = "Invalid Email" });
            }
            if (!BCrypt.Net.BCrypt.Verify(user.Password, existUser.Password))
            {
                return Ok(new { message = "Invalid Password" });
            }

            string jwt = JwtService.Generate(existUser.IdUser);
            HttpContext.Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.Now.AddMinutes(60),
                IsEssential = true
            }) ; 
            return Ok(new
            {
                user= existUser,
                jwt
            });

        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = JwtService.Verify(jwt);
                int idUser = int.Parse(token.Issuer);

                var user = context.Users.Include(u => u.Votings).ThenInclude(i => i.IdItemNavigation).FirstAsync(x => x.IdUser == idUser);
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "success"
            });
        }
    }
}
