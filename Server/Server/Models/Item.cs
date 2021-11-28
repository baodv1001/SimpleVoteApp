using System;
using System.Collections.Generic;

#nullable disable

namespace Server.Models
{
    public partial class Item
    {
        public Item()
        {
            Votings = new HashSet<Voting>();
        }

        public int IdItem { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? Votes { get; set; }

        public virtual ICollection<Voting> Votings { get; set; }
    }
}
