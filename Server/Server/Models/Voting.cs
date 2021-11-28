using System;
using System.Collections.Generic;

#nullable disable

namespace Server.Models
{
    public partial class Voting
    {
        public int IdVoting { get; set; }
        public int IdUser { get; set; }
        public int IdItem { get; set; }
        public DateTime VoteDate { get; set; }

        public virtual Item IdItemNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
