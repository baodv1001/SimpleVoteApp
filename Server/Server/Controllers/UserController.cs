using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VoteAppDBContext context= new VoteAppDBContext();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            return await context.Users.Include(u=>u.Votings).ThenInclude(i=>i.IdItemNavigation).ToListAsync();
        }

        //[Route("{idUser}")]
        [HttpGet("{idUser}")]
        public async Task<ActionResult<User>> Get(int idUser)
        {

            var user = await context.Users.Include(u => u.Votings).ThenInclude(i => i.IdItemNavigation).FirstAsync(x=>x.IdUser==idUser);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(User user)
        {
            //create User
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { idUser = user.IdUser }, user);
        }

        [HttpPost("voting")]
        public async Task<IActionResult> Update(Voting voting)
        {

            /*if (idUser != user.IdUser)
            {
                return BadRequest();
            }

            context.Users.Update(user);*/
            context.Votings.Add(voting);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return NotFound();
            } 

            return Ok();
        }

        [HttpDelete("{idUser}")]
        public async Task<IActionResult> Delete(int idUser)
        {
            var user = await context.Users.FindAsync(idUser);

            if (user == null)
            {
                return NotFound();
            }
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int idUser)
        {
            return context.Users.Any(e => e.IdUser == idUser);
        }
    }
}
