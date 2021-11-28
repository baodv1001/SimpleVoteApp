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
    public class ItemController : ControllerBase
    {
        private readonly VoteAppDBContext context = new VoteAppDBContext();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetAll()
        {
            return await context.Items.ToListAsync();
        }

        //[Route("{idItem}")]
        [HttpGet("{idItem}")]
        public async Task<ActionResult<Item>> Get(int idItem)
        {

            var item = await context.Items.FindAsync(idItem);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Item>> Create(Item item)
        {
            //create Item
            context.Items.Add(item);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { idItem = item.IdItem }, item);
        }

        [HttpPatch("{idItem}")]
        public async Task<IActionResult> Update(int idItem, Item item)
        {

            if (idItem != item.IdItem)
            {
                return BadRequest();
            }

            context.Items.Update(item);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(idItem))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{idItem}")]
        public async Task<IActionResult> Delete(int idItem)
        {
            var item = await context.Items.FindAsync(idItem);

            if (item == null)
            {
                return NotFound();
            }

            context.Items.Remove(item);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int idItem)
        {
            return context.Items.Any(e => e.IdItem == idItem);
        }
    }
}
