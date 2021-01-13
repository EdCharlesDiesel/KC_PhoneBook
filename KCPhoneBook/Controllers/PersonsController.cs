using AutoMapper;
using KCPhoneBook.Models;
using KCPhoneBook.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KCPhoneBook.Controllers
{
    [ApiController]
    [Route("api/persons")]

    public class PersonsController : Controller
    {
        private readonly IPhoneBookRepository _phoneBookRepository;
        private readonly IMapper _mapper;
        

        public PersonsController(IPhoneBookRepository phoneBookRepository, IMapper mapper)
        {
            _phoneBookRepository = phoneBookRepository ??
                throw new ArgumentNullException(nameof(phoneBookRepository));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));            
        }

        [HttpGet(Name = "GetPersons")]
        [HttpHead]
        public async Task<IActionResult> GetPersons()
        {
            var personsFromRepo = await _phoneBookRepository.GetAllPersons();

            return Ok(_mapper.Map<IEnumerable<PersonDto>>(personsFromRepo));
        }

        [HttpGet("{Id}", Name = "GetPerson")]
        public async Task<IActionResult> GetPerson(int Id)
        {
            var personFromRepo = await _phoneBookRepository.GetPerson(Id);

            if (personFromRepo == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PersonDto>(personFromRepo));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody]PersonForCreationDto person)
        {
               if (person == null)
            {
                return BadRequest();
            }
            var personEntity = _mapper.Map<Entities.Person>(person);
            await _phoneBookRepository.AddPerson(personEntity);
            if (! await _phoneBookRepository.SaveAsync())
            {
                   throw new Exception("Adding a person failed on save.");
            }
            

            var personToReturn = _mapper.Map<PersonDto>(personEntity);
            return CreatedAtRoute("GetPerson",
                new { Id = personToReturn.Id },
                personToReturn);
        }

        [HttpOptions]
        public IActionResult GetPersonOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST");
            return Ok();
        }

         [HttpPatch("{Id}")]
        public async Task<IActionResult> PartiallyUpdatePerson(int Id,
          [FromBody] JsonPatchDocument<PersonForUpdateDto> jsonPatchDocument)
        {
            if (jsonPatchDocument == null)
            {
                return BadRequest();
            }

            var personFromRepo = await _phoneBookRepository.GetPerson(Id);

            if (personFromRepo == null)
            {
                return BadRequest();
            }

            var personToPatch = _mapper.Map<PersonForUpdateDto>(personFromRepo);

            jsonPatchDocument.ApplyTo(personToPatch, ModelState);

            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            if (!TryValidateModel(personToPatch))
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            _mapper.Map(personToPatch, personFromRepo);

            await _phoneBookRepository.UpdatePerson(personFromRepo);

            if (!await _phoneBookRepository.SaveAsync())
            {
                throw new Exception("Updating a person failed on save.");
            }

            return NoContent();
        }

            [HttpPut("{Id}")]
        public async Task<IActionResult> UpdatePerson(int Id,       
            PersonForUpdateDto person)
        {
            if (! await _phoneBookRepository.PersonExists(Id))
            {
                return NotFound();
            }

            var personFromRepo =await _phoneBookRepository.GetPerson(Id);

            if (personFromRepo == null)
            {
                var personToAdd = _mapper.Map<Entities.Person>(person);
                //personToAdd.Id = Id;

                await _phoneBookRepository.AddPerson(personToAdd);

                await _phoneBookRepository.SaveAsync();

                var personToReturn = _mapper.Map<PersonDto>(personToAdd);

                return CreatedAtRoute("GetPerson",
                    new { person, Id = personToReturn.Id },
                    personToReturn);
            }

            
            _mapper.Map(person, personFromRepo);

            await _phoneBookRepository.UpdatePerson(personFromRepo);

            await _phoneBookRepository.SaveAsync();
            return NoContent();
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeletePerson(int Id)
        {
            var personFromRepo = await _phoneBookRepository.GetPerson(Id);

            if (personFromRepo == null)
            {
                return NotFound();
            }
            _phoneBookRepository.DeletePerson(personFromRepo);
            await _phoneBookRepository.SaveAsync();

            return NoContent();
        }

    }
}
